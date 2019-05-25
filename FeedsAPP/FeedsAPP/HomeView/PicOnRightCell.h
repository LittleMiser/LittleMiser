//
//  PicOnRightCell.h
//  FeedsAPP
//
//  Created by student4 on 2019/5/18.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HomeViewModel.h"
NS_ASSUME_NONNULL_BEGIN

@interface PicOnRightCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UILabel *infoLabel;
@property (weak, nonatomic) IBOutlet UIImageView *rightImage;
@property (weak, nonatomic) IBOutlet UIButton *closeButton;
@property(nonatomic,strong) HomeViewModel *model;

@end

NS_ASSUME_NONNULL_END
