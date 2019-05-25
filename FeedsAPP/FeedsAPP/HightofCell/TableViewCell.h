//
//  UITableViewCell.h
//  FeedsAPP
//
//  Created by student on 2019/5/18.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#ifndef TableViewCell_h
#define TableViewCell_h

#import <UIKit/UIKit.h>

@interface TableViewCell : UITableViewCell{
    
}

//用户名
@property(nonatomic,retain) UILabel *name;
//用户介绍
@property(nonatomic,retain) UILabel *introduction;
//用户头像
@property(nonatomic,retain) UIImageView *userImage;

//给用户介绍赋值并且实现自动换行
-(void)setIntroductionText:(NSString*)text;
//初始化cell类
-(id)initWithReuseIdentifier:(NSString*)reuseIdentifier;
@end

#endif /* TableViewCell_h */
