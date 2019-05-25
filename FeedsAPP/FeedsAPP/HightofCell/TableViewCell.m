//
//  TableViewCell.m
//  FeedsAPP
//
//  Created by student on 2019/5/18.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TableViewCell.h"

@implementation TableViewCell

-(id)initWithReuseIdentifier:(NSString*)reuseIdentifier{
    self = [super initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseIdentifier];
    if (self) {
        [self initLayuot];
    }
    return self;
}
//初始化控件
-(void)initLayuot{
    _name = [[UILabel alloc] initWithFrame:CGRectMake(65, 15, 250, 40)];
    [self addSubview:_name];
    _userImage = [[UIImageView alloc] initWithFrame:CGRectMake(5, 15, 45, 45)];
    [self addSubview:_userImage];
    _introduction = [[UILabel alloc] initWithFrame:CGRectMake(10, 75, 350, 40)];
    [self addSubview:_introduction];
}

//赋值 and 自动换行,计算出cell的高度
-(void)setIntroductionText:(NSString*)text{
    //获得当前cell高度
    CGRect frame = [self frame];
    //文本赋值
    self.introduction.text = text;
    //设置label的最大行数
    self.introduction.numberOfLines = 10;
    CGSize size = CGSizeMake(350, 1000);
    CGSize labelSize = [self.introduction.text sizeWithFont:self.introduction.font constrainedToSize:size lineBreakMode:NSLineBreakByClipping];
    self.introduction.frame = CGRectMake(self.introduction.frame.origin.x, self.introduction.frame.origin.y, labelSize.width, labelSize.height);
    
    //计算出自适应的高度
    frame.size.height = labelSize.height+100;
    
    self.frame = frame;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];
    
}

@end  
